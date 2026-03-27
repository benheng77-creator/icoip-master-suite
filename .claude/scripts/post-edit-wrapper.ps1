param()
$ErrorActionPreference = "Continue"
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot | Split-Path -Parent)

$sentinel = Join-Path ".claude" "validation.failed"
if (Test-Path -LiteralPath $sentinel) {
    Remove-Item -LiteralPath $sentinel -Force -ErrorAction SilentlyContinue
}

powershell -ExecutionPolicy Bypass -File ".claude/scripts/post-edit-validate.ps1"
if ($LASTEXITCODE -ne 0) {
    New-Item -ItemType File -Path $sentinel -Force | Out-Null
    exit 1
}

exit 0
