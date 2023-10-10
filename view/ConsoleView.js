const cliColor = require('cli-color');

class ConsoleView {
  clear() {
    console.clear()
  }

  
  showIntro() {
    console.log("Starting...");

    console.log();
    console.log(cliColor.magenta("                                     |__"));
    console.log(cliColor.magenta("                                     |\\/"));
    console.log(cliColor.magenta("                                     ---"));
    console.log(cliColor.magenta("                                     / | ["));
    console.log(cliColor.magenta("                              !      | |||"));
    console.log(cliColor.magenta("                            _/|     _/|-++'"));
    console.log(cliColor.magenta("                        +  +--|    |--|--|_ |-"));
    console.log(cliColor.magenta("                     { /|__|  |/\\__|  |--- |||__/"));
    console.log(cliColor.magenta("                    +---------------___[}-_===_.'____                 /\\"));
    console.log(cliColor.magenta("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _"));
    console.log(cliColor.magenta(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7"));
    console.log(cliColor.magenta("|                        Welcome to Battleship                         BB-61/"));
    console.log(cliColor.magenta(" \\_________________________________________________________________________|"));
    console.log();

    console.log("Game flow:")
    console.log("1. Setup your fleet;")
    console.log("2. Shoot into enemy;")
    console.log("3. Win or loose.")

    console.log()

    console.log(cliColor.magenta("Good luck!"))
    console.log()
    console.log()
  }

  showGamePhase() {
    console.log("                  __");
    console.log("                 /  \\");
    console.log("           .-.  |    |");
    console.log("   *    _.-'  \\  \\__/");
    console.log("    \\.-'       \\");
    console.log("   /          _/");
    console.log("  |      _  /");
    console.log("  |     /_\\'");
    console.log("   \\    \\_/");
    console.log("    \"\"\"\"");
  }

  showHit() {
    console.log(cliColor.red("                \\         .  ./"));
    console.log(cliColor.red("              \\      .:\";'.:..\"   /"));
    console.log(cliColor.red("                  (M^^.^~~:.'\")."));
    console.log(cliColor.red("            -   (/  .    . . \\ \\)  -"));
    console.log(cliColor.red("               ((| :. ~ ^  :. .|))"));
    console.log(cliColor.red("            -   (\\- |  \\ /  |  /)  -"));
    console.log(cliColor.red("                 -\\  \\     /  /-"));
    console.log(cliColor.red("                   \\  \\   /  /"));
  }

}

module.exports = ConsoleView