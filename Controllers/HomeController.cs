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

    public IActionResult Sala(int id)
    {
        var partidaId = HttpContext.Session.GetInt32("PartidaId");
        var puedeEntrar = BD.PuedeAccederSala(partidaId, id);   // consulta Dapper
        if (!puedeEntrar) return RedirectToAction("AccesoDenegado");
        HttpContext.Session.SetInt32("SalaActual", id);
        return View("Sala", new SalaViewModel { Id = id });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
