using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BookReaderApp.Models;

namespace BookReaderApp.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:3000") };
        }

        public async Task<List<Book>> GetBooksAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/books");

                if (!response.IsSuccessStatusCode)
                {
                    // Gérer les erreurs HTTP ici
                    throw new Exception($"Error: {response.StatusCode}");
                }

                var responseData = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Book>>(responseData);
            }
            catch (Exception ex)
            {
                // Gérer les erreurs ici
                Console.WriteLine($"Une erreur s'est produite lors de la récupération des livres : {ex.Message}");
                return null;
            }
        }

        public async Task<Stream> GetBookEpubAsync(string bookId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/epub/{bookId}");

                if (!response.IsSuccessStatusCode)
                {
                    // Gérer les erreurs HTTP ici
                    throw new Exception($"Error: {response.StatusCode}");
                }

                return await response.Content.ReadAsStreamAsync();
            }
            catch (Exception ex)
            {
                // Gérer les erreurs ici
                Console.WriteLine($"Une erreur s'est produite lors de la récupération de l'EPUB du livre : {ex.Message}");
                return null;
            }
        }
    }
}
