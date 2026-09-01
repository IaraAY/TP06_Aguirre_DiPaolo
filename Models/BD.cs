using Microsoft.Data.SqlClient;
using Dapper;
namespace TP06_Aguirre_DiPaolo.Models;

public class BD{
    private string _connectionString = @"Server=localhost; DataBase=SalaDeEscape;Integrated Security=True;TrustServerCertificate=True";
    public Sala GetSala(int idSala){
        Sala sala;
        using(SqlConnection connection = new SqlConnection(_connectionString)){
            string query = "SELECT * FROM Salas WHERE IdSala = @IdSala";;
            sala = connection.QueryFirstOrDefault<Sala>(query, new { IdSala = idSala });
        }
        if(sala != null){
            return sala;
        } else {
            throw new Exception("No se encontró la sala con el ID proporcionado.");
        }
    }

    public bool ValidarRespuesta(int idSala, string respuesta){
        Sala sala;
        using(SqlConnection connection = new SqlConnection(_connectionString)){
            string query = "SELECT * FROM Salas WHERE IdSala = @idSala AND Respuesta = @respuesta"; 
            sala = connection.QueryFirstOrDefault<Sala>(query, new { IdSala = idSala, Respuesta = respuesta });
        }
        if(sala != null){
            return true;
        } else {
            return false;
        }
    }
    public void GuardarJugador(string nombre){
        using(SqlConnection connection = new SqlConnection(_connectionString)){
            DateTime fechaInicio = DateTime.Now;
            string query = "INSERT INTO Partidas (FechaInicio, Estado, IdSala) VALUES (@fechaInicio, 1, 1)";
            connection.Execute(query, new { FechaInicio = fechaInicio});
            // Obtener el IdPartida de la partida recién insertada
            query = "SELECT TOP 1 IdPartida FROM Partidas ORDER BY IdPartida DESC";
            int idPartida = connection.QueryFirstOrDefault<int>(query);
            query = "INSERT INTO Jugadores (Nombre, IdPartida) VALUES (@Nombre, @IdPartida)";
            connection.Execute(query, new { Nombre = nombre, IdPartida = idPartida });
        }
    }
}