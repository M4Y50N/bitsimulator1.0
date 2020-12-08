using Microsoft.AspNetCore.Mvc;

namespace BitSimulator.Controllers
{
    public class BitSimulatorController : Controller
    {
        public IActionResult IndexWindow() {
            return View();
        }
        public IActionResult IndexApresentation() {
            return View();
        }
    }
}