
### First initial working template
### Learn more in https://nix.dev/tutorials/learning-journey/sharing-dependencies

# Tip
# `nix-shell` first in terminal
# `vscode .` spawn vscode from nix environment

let
  pkgs = import <nixpkgs> {};
in
  pkgs.mkShell {

    # Define packages
    packages = [
      pkgs.which
      pkgs.vscode # export NIXPKGS_ALLOW_UNFREE=1
      pkgs.nodejs_16 # export NIXPKGS_ALLOW_INSECURE=1
      pkgs.nodePackages.firebase-tools
    ];
    
    # Shell environments
    env = {
      DB_USER = "db_user";
    };

    # Export to use the variable on shell child processes.
    # You can also execute shell on shell-nix entry such as creating directories.
    shellHook = ''
      echo "Hello! Your nix environment is working."
      export DB_USER
    '';
  }
