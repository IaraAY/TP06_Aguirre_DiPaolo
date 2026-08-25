using Microsoft.Data.SqlClient;
using Dapper;
namespace TP06_Aguirre_DiPaolo.Models;

public class BD{
    private string _connectionString = @"Server=localhost; DataBase=SalaDeEscape;Integrated Security=True;TrustServerCertificate=True";
    public bool PuedeAccederSala(int? partidaId, int? salaId)
    {
        if (partidaId == null || salaId == null) return false;
        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var query = "SELECT COUNT(*) FROM Partidas WHERE IdPartida = @PartidaId AND IdSala = @IdSala";
            var count = connection.ExecuteScalar<int>(query, new { PartidaId = partidaId, SalaId = salaId });
            return count > 0;
        }
    }
}