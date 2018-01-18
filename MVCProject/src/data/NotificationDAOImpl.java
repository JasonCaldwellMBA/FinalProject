package data;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Notification;
@Repository
@Transactional
public class NotificationDAOImpl implements NotificationDAO{
	@PersistenceContext
	EntityManager em; 
	
	@Override
	public List<Notification> index(int uid) {
		String query = "SELECT n FROM Notification n WHERE n.user.id = :uid"; 
		
		return em.createQuery(query, Notification.class)
				.setParameter("uid", uid)
				.getResultList(); 
	}

	@Override
	public Notification create(String json, int userId) {
		ObjectMapper om = new ObjectMapper();
		Notification n = null; 
		
		try {
			n = om.readValue(json, Notification.class);
			em.persist(n);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
		
		return n;
	}

	@Override
	public Notification destroy(int nId) {
		Notification n = em.find(Notification.class, nId); 
		em.remove(n);
		return n;
	}

	@Override
	public List<Notification> bizIndex(int bizId) {
		String query = "SELECT n FROM Notification n WHERE n.business.id = :bizId"; 
		
		return em.createQuery(query, Notification.class)
				.setParameter("bizId", bizId)
				.getResultList(); 
	}
}
