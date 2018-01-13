package controllers;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.AuthDAO;
import entities.Business;
import entities.User;

@RestController
public class AuthController {
	@Autowired
	AuthDAO dao; 
	
	@RequestMapping(path="/auth/user/register", method=RequestMethod.POST)
	public User create(@RequestBody String json,
			HttpServletResponse res,
			HttpSession session){
		User user = dao.register(json); 
		if(user != null) {
			session.setAttribute("user", user);
			res.setStatus(201);
		}
		else {
			res.setStatus(400); 
		}
		return user; 
	}
	@RequestMapping(path="/auth/user/login", method=RequestMethod.PUT)
	public User login(@RequestBody String json,
			HttpServletResponse res,
			HttpSession session){
		User user = dao.login(json); 
		if(user != null) {
			res.setStatus(201);
			session.setAttribute("user", user);
		}
		else {
				res.setStatus(400);
		}
		return user; 
	}
	@RequestMapping(path="/auth/logout", method=RequestMethod.PUT)
	public Boolean logout(HttpSession session) {
		session.removeAttribute("user");
		return true; 
	}
	@RequestMapping(path="/auth/unauthorized", method=RequestMethod.GET)
	public String unauthorized(HttpServletResponse res) {
		res.setStatus(401);
		return "Fail"; 
	}
}
