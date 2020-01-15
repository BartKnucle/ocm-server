$rootPath = Split-Path $script:MyInvocation.MyCommand.Path
$installPath = Join-Path -Path $rootPath -ChildPath "files\AcroRead.msi"
Start-Process $installPath /qn -Wait