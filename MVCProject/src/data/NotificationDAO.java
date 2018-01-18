package data;

import java.util.List;

import entities.Notification;

public interface NotificationDAO {
	//user
	public List<Notification> index(int uid); 
	public Notification create(String json, int userId); 
	public Notification destroy(int nId);
	
	//business
	public List<Notification> bizIndex(int bizId); 
}
