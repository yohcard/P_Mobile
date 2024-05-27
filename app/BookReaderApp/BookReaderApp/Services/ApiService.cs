using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BookReaderApp.Models;

namespace BookReaderApp.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "http://localhost:3000";

        public ApiService()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri(BaseUrl) };
        }

        public async Task<List<Book>> GetBooksAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/books");

                response.EnsureSuccessStatusCode(); // Throws exception for non-success status codes

                var responseData = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Book>>(responseData);
            }
            catch (HttpRequestException ex)
            {
                // Gérer les erreurs HTTP ici
                Console.WriteLine($"Une erreur HTTP s'est produite : {ex.Message}");
                return null;
            }
            catch (Exception ex)
            {
                // Gérer les autres erreurs ici
                Console.WriteLine($"Une erreur s'est produite : {ex.Message}");
                return null;
            }
        }

        public async Task<byte[]> GetBookEpubAsync(string bookId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/epub/{bookId}");

                response.EnsureSuccessStatusCode(); // Throws exception for non-success status codes

                return await response.Content.ReadAsByteArrayAsync();
            }
            catch (HttpRequestException ex)
            {
                // Gérer les erreurs HTTP ici
                Console.WriteLine($"Une erreur HTTP s'est produite : {ex.Message}");
                return null;
            }
            catch (Exception ex)
            {
                // Gérer les autres erreurs ici
                Console.WriteLine($"Une erreur s'est produite : {ex.Message}");
                return null;
            }
        }
    }
}
