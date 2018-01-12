package controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.UserDAO;
import entities.User;

@RestController
public class UserController {

	@Autowired
	private UserDAO dao;
	@RequestMapping(path="/user/{id}", method=RequestMethod.GET)
	public User show(@PathVariable int id, HttpServletResponse res) {
		User user = dao.show(id); 
		if(user != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(404);
		}
		return user; 
	}
	@RequestMapping(path="/user", method=RequestMethod.POST)
	public User create(@RequestBody String json, HttpServletResponse res){
		User user = dao.create(json); 
		if(user != null) {
			res.setStatus(201);
		}
		else {
			res.setStatus(400); 
		}
		return user; 
	}
	@RequestMapping(path="/user/{id}", method=RequestMethod.PUT)
	public User update(@RequestBody String json, @PathVariable int id, HttpServletResponse res) {
		User user = dao.update(id,json);
		if(user != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(400); 
		}
		return user; 
	}
	@RequestMapping(path="/user/{id}", method=RequestMethod.DELETE)
	public User destroy(@PathVariable int id, HttpServletResponse res) {
		User user = dao.destroy(id); 
		if(user != null) {
			res.setStatus(202);
		}
		else {
			res.setStatus(400); 
		}
		return user; 
	}
}
