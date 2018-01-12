package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.VehicleDAO;
import entities.Vehicle;

@RestController
public class VehicleController {
	@Autowired
	private VehicleDAO dao; 
	
	@RequestMapping(path="/user/{id}/vehicle", method=RequestMethod.GET)
	public List<Vehicle> index(@PathVariable int id, HttpServletResponse res){
		List<Vehicle> vehicles = dao.index(id); 
		if(vehicles != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return vehicles; 
	}
}
