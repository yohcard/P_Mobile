using Microsoft.Maui.Controls;
using BookReaderApp.Services;
using BookReaderApp.Models;

namespace BookReaderApp
{
    public partial class MainPage : ContentPage
    {
        private readonly ApiService _apiService;

        public MainPage()
        {
            InitializeComponent();
            _apiService = new ApiService();
            LoadBooks();
        }

        private async void LoadBooks()
        {
            var books = await _apiService.GetBooksAsync();
            BooksListView.ItemsSource = books;
        }

        private async void OnItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            if (e.SelectedItem is Book selectedBook)
            {
                await Navigation.PushAsync(new BookDetailPage(selectedBook.Id));
            }
        }
    }
}
