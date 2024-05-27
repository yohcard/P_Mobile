using Microsoft.Maui.Controls;

namespace BookReaderApp
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
            MainPage = new AppShell();
        }
    }
}
