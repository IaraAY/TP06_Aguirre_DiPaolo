using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TP06_Aguirre_DiPaolo.Models;

namespace TP06_Aguirre_DiPaolo.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }
    //Que reciba el nombre del jugador y lo guarde en la base de datos
    [HttpPost]
    public IActionResult GuardarJugador(string nombre){
        BD bd = new BD();
        bd.GuardarJugador(nombre);
        ViewBag.sala = bd.GetSala(1);
        HttpContext.Session.SetString("NombreJugador", nombre);
        HttpContext.Session.SetString("Sala", ViewBag.sala.IdSala.ToString());
        return RedirectToAction("Tipo" + ViewBag.sala.IdSala.ToString(), "Salas");
    }

    //Hacer un verificar respuesta que recibe la respuesta de la sala y el id de la sala y verifique si es correcta o no
    [HttpPost]
    public IActionResult VerificarRespuesta(string respuesta, int idSala){
        BD bd = new BD();
        bool esCorrecta = bd.ValidarRespuesta(idSala, respuesta);
        //Si es correcta redirigir a la view de mensajeCorrecto, que va a mostrar una view con el mensaje correcto de la sala y le va a sumar 1 a la sala actual del session, si no es correcta mandar nuevamente a la view de la sala con un mensaje de error
        if(esCorrecta){
            ViewBag.sala = bd.GetSala(idSala);
            HttpContext.Session.SetString("Sala", (idSala + 1).ToString());
            return RedirectToAction("MensajeCorrecto", "Salas");
        } else {
            ViewBag.sala = bd.GetSala(idSala);
            ViewBag.Error = "Respuesta incorrecta, intentalo nuevamente";
            return RedirectToAction("Tipo" + idSala.ToString(), "Salas");
        }
    }

    //Es llamada en la view de mensaje correcto y redirige a la view del siguiente nivel (que ya está guardado en Session)
    public IActionResult SiguienteNivel(){
        int idSala = int.Parse(HttpContext.Session.GetString("Sala"));
        return RedirectToAction("Tipo" + idSala.ToString(), "Salas");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
