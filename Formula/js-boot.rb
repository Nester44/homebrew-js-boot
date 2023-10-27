class Getfilesize < Formula
    desc "Bootstrap projects with cli tool"
    homepage "https://github.com/nester44/homebrew-js-boot"
    url "https://github.com/Nester44/homebrew-js-boot/releases/download/v1.0.0/js-boot.tar.gz"
    sha256 "748d0350c9113806d0568a58e688105398646898fd8ed5ed52ec7530e8142c28"
    license "MIT"
    version "1.0.0"
  
    def install
      bin.install "js-boot"
    end
  end