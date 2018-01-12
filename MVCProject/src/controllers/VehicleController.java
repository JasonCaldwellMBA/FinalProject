package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	@RequestMapping(path="/user/{id}/vehicle/{vid}", method=RequestMethod.GET)
	public Vehicle show(@PathVariable int id, @PathVariable int vid, HttpServletResponse res) {
		Vehicle v = dao.show(id, vid); 
		if(v != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return v; 
	}
	@RequestMapping(path="/user/{id}/vehicle", method=RequestMethod.POST)
	public Vehicle create(@PathVariable int id,@RequestBody String json, HttpServletResponse res) {
		Vehicle v = dao.create(id, json); 
		if(v != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(400);
		}
		return v;
	}
	@RequestMapping(path="/user/{id}/vehicle/{vid}", method=RequestMethod.PUT)
	public Vehicle update(@PathVariable int id, @PathVariable int vid,  @RequestBody String json, HttpServletResponse res) {
		Vehicle v = dao.update(id, vid, json); 
		if(v != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(400);
		}
		return v; 
	}
	@RequestMapping(path="/user/{id}/vehicle/{vid}", method=RequestMethod.DELETE)
	public Vehicle destroy(@PathVariable int id, @PathVariable int vid,  @RequestBody String json, HttpServletResponse res) {
		Vehicle v = dao.destroy(id, vid); 
		if(v != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return v; 
	}
}
