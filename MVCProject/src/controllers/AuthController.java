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
public class AuthController {
	@Autowired
	UserDAO dao; 
	
	
	@RequestMapping(path="/user/register", method=RequestMethod.POST)
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
//	@RequestMapping(path="/login/{id}", method=RequestMethod.GET)
//	public User login(@PathVariable int id, @RequestBody String json , HttpServletResponse res){
//		User user = dao.login(id); 
//		if(user != null) {
//			res.setStatus(201);
//		}
//		else {
//			res.setStatus(400); 
//		}
//		return user; 
//	}
}
