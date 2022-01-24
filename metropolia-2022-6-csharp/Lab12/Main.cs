using System;

namespace Lab12
{
    public class Main
    {
        private Dictionary<string, ApplicationCommand> _inputCommands = new();
        public Main()
        {
            _inputCommands.Add("stop", ApplicationCommand.Stop);
            _inputCommands.Add("exit", ApplicationCommand.Stop);
            _inputCommands.Add("quit", ApplicationCommand.Stop);
            _inputCommands.Add("end", ApplicationCommand.Stop);
            _inputCommands.Add("start", ApplicationCommand.Start);
            _inputCommands.Add("execute", ApplicationCommand.Start);
            _inputCommands.Add("print", ApplicationCommand.Start);
        }


        public void Start()
        {
            ApplicationCommand command;

            do
            {
                var userInput = Console.ReadLine() ?? "";

                var validInput = _inputCommands.TryGetValue(userInput.ToLower(), out command);

                if (validInput && command == ApplicationCommand.Start)
                {
                    Console.WriteLine("Starting the application...");
                }

            } while (command != ApplicationCommand.Stop);

            Console.WriteLine("Stopping the application...");
        }
    }
}
