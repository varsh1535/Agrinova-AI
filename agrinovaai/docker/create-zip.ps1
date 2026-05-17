$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$zip = Join-Path $root "AgriNova-AI.zip"
$stage = Join-Path $root ".zip-staging"
$excludeDirs = @("node_modules", "dist", "__pycache__", ".git", ".zip-staging")
$excludeFiles = @("AgriNova-AI.zip", ".env", ".env.local")

if (Test-Path $zip) {
  Remove-Item -LiteralPath $zip -Force
}

if (Test-Path $stage) {
  Remove-Item -LiteralPath $stage -Recurse -Force
}

New-Item -ItemType Directory -Path $stage | Out-Null

$files = Get-ChildItem -Path $root -Recurse -File | Where-Object {
  $relative = $_.FullName.Substring($root.Length + 1)
  $parts = $relative -split [regex]::Escape([IO.Path]::DirectorySeparatorChar)
  -not ($parts | Where-Object { $excludeDirs -contains $_ }) -and
  -not ($excludeFiles -contains $_.Name)
}

foreach ($file in $files) {
  $relative = $file.FullName.Substring($root.Length + 1)
  $target = Join-Path $stage $relative
  $targetDir = Split-Path -Parent $target
  if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
  }
  Copy-Item -LiteralPath $file.FullName -Destination $target
}

Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $zip -Force
Remove-Item -LiteralPath $stage -Recurse -Force
Write-Host "Created $zip"
