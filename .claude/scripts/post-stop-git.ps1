param()
$ErrorActionPreference = "Continue"
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot | Split-Path -Parent)

git rev-parse --is-inside-work-tree *> $null
if ($LASTEXITCODE -ne 0) { exit 0 }

$sentinel = Join-Path ".claude" "validation.failed"
if (Test-Path -LiteralPath $sentinel) { exit 0 }

git add -A
$staged = git diff --cached --name-only
if (-not $staged) { exit 0 }

$stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "auto: autonomous repo update ($stamp)" | Out-Null
if ($LASTEXITCODE -ne 0) { exit 0 }

$pushOk = $false
1..3 | ForEach-Object {
    git push
    if ($LASTEXITCODE -eq 0) {
        $pushOk = $true
        return
    }
    Start-Sleep -Seconds 5
}

if (-not $pushOk) {
    Write-Host "[auto] git push failed after retries" -ForegroundColor Red
    exit 0
}

exit 0
