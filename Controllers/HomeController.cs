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
        HttpContext.Session.SetString("Sala", "1");
        return RedirectToAction("Tipo1", "Home");
    }

    //Hacer un verificar respuesta que recibe la respuesta de la sala y el id de la sala y verifique si es correcta o no
    [HttpPost]
    public IActionResult VerificarRespuesta(string respuesta){
        BD bd = new BD();
        int idSala = int.Parse(HttpContext.Session.GetString("Sala"));
        bool esCorrecta = bd.ValidarRespuesta(idSala, respuesta);
        //Si es correcta redirigir a la view de mensajeCorrecto, que va a mostrar una view con el mensaje correcto de la sala y le va a sumar 1 a la sala actual del session, si no es correcta mandar nuevamente a la view de la sala con un mensaje de error
        if(esCorrecta){
            ViewBag.sala = bd.GetSala(idSala);
            HttpContext.Session.SetString("Sala", (idSala + 1).ToString());
            return View("MensajeCorrecto");
        } else {
            ViewBag.sala = bd.GetSala(idSala);
            ViewBag.Error = "Respuesta incorrecta, intentalo nuevamente";
            return RedirectToAction("Tipo" + ViewBag.sala.IdSala.ToString(), "Home");
        }
    }

    public IActionResult Tipo1()
    {
        BD bd = new BD();
        int idSala = int.Parse(HttpContext.Session.GetString("Sala"));
        ViewBag.sala = bd.GetSala(idSala);
        return View();
    }

    public IActionResult Tipo2()
    {
        BD bd = new BD();
        int idSala = int.Parse(HttpContext.Session.GetString("Sala"));
        ViewBag.sala = bd.GetSala(idSala);
        if (ViewBag.sala == null)
        {
            throw new Exception("No se encontró la sala con ID " + idSala);
        }
        if (ViewBag.sala.Archivo == null)
        {
            throw new Exception("La sala " + idSala + " tiene Archivo NULL en la base de datos.");
        }
        ViewBag.Archivos = ViewBag.sala.Archivo.Split("Informe");
        return View();
    }

    //Es llamada en la view de mensaje correcto y redirige a la view del siguiente nivel (que ya está guardado en Session)
    public IActionResult SiguienteNivel(){
        int idSala = int.Parse(HttpContext.Session.GetString("Sala"));
        return RedirectToAction("Tipo" + idSala.ToString(), "Home");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
