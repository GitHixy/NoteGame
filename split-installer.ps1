$SourceFile = "releases/NoteGame-1.0.0 Setup.exe"
$ChunkSize = 50MB
$Directory = "releases/installer_parts"

# Create the directory if it doesn't exist
New-Item -ItemType Directory -Force -Path $Directory | Out-Null

# Get file size and calculate number of parts
$FileSize = (Get-Item $SourceFile).Length
$NumberOfParts = [Math]::Ceiling($FileSize / $ChunkSize)

Write-Host "Splitting $SourceFile into $NumberOfParts parts..."

# Read the source file and write chunks
$ReadBuffer = New-Object byte[] $ChunkSize
$FileStream = [System.IO.File]::OpenRead($SourceFile)

for ($i = 0; $i -lt $NumberOfParts; $i++) {
    $PartFileName = "$Directory/installer_part_$($i+1)_of_$NumberOfParts.bin"
    $BytesRead = $FileStream.Read($ReadBuffer, 0, $ChunkSize)
    
    $FileWriter = [System.IO.File]::Create($PartFileName)
    $FileWriter.Write($ReadBuffer, 0, $BytesRead)
    $FileWriter.Close()
    
    Write-Host "Created part $($i+1) of $NumberOfParts"
}

$FileStream.Close()

# Create instructions file
$Instructions = @"
# NoteGame Installer

The installer has been split into $NumberOfParts parts due to GitHub file size limitations.

## Instructions to reassemble:

### Windows (PowerShell):

```powershell
# Navigate to the directory containing the parts
cd path/to/installer_parts

# Combine parts into the original installer
Get-ChildItem -Path . -Filter installer_part_*.bin | Sort-Object Name | ForEach-Object { Get-Content $_ -Raw -Encoding Byte } | Set-Content -Path "../NoteGame-1.0.0 Setup.exe" -Encoding Byte
```

### macOS/Linux:
```bash
# Navigate to the directory containing the parts
cd path/to/installer_parts

# Combine parts into the original installer
cat installer_part_* > "../NoteGame-1.0.0 Setup.exe"
```

Once reassembled, run the installer to set up NoteGame on your system.
"@

Set-Content -Path "$Directory/README.md" -Value $Instructions

Write-Host "Split complete! Files are in the $Directory directory"
