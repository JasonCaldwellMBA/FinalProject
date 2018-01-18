package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.NotificationDAO;
import entities.Notification;
@CrossOrigin
@RestController
public class NotificationController {
	
	@Autowired
	NotificationDAO dao; 
	
	@RequestMapping(path="user/{uid}/notification", method=RequestMethod.GET)
	public List<Notification> index(@PathVariable int uid){
		return dao.index(uid); 
	}
	@RequestMapping(path="business/{bizId}/notification", method=RequestMethod.GET)
	public List<Notification> indexBusiness(@PathVariable int bizId){
		return dao.index(bizId); 
	}
	@RequestMapping(path="create/notification", method=RequestMethod.POST)
	public List<Notification> create(@RequestBody String json, @PathVariable int bizId){
		return dao.index(bizId); 
	}
	@RequestMapping(path="notification/{nid}", method=RequestMethod.DELETE)
	public Notification destroy(@PathVariable int nId){
		return dao.destroy(nId); 
	}
}
