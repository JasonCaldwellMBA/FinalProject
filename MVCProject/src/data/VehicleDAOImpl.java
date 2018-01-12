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

import entities.User;
import entities.Vehicle;
@Transactional
@Repository
public class VehicleDAOImpl implements VehicleDAO {
	@PersistenceContext
	EntityManager em; 
	@Override
	public List<Vehicle> index(int id) {
		String query = "SELECT v FROM Vehicle v WHERE v.user.id = :id"; 
		return em.createQuery(query, Vehicle.class)
				.setParameter("id", id)
				.getResultList();
	}

	@Override
	public Vehicle show(int uid, int vid) {
		return em.find(Vehicle.class, vid);
	}

	@Override
	public Vehicle create(int uid, String json) {
		ObjectMapper mapper = new ObjectMapper(); 
		Vehicle v = null; 
		
		try {
			v = mapper.readValue(json, Vehicle.class);
			User u = em.find(User.class, uid); 
			v.setUser(u);
			em.persist(v);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return v;
	}

	@Override
	public Vehicle update(int uid, int vid, String json) {
		ObjectMapper mapper = new ObjectMapper(); 
		Vehicle v = null; 
		Vehicle retV = null; 
		try {
			v = mapper.readValue(json, Vehicle.class);
			retV = em.find(Vehicle.class, vid); 
			retV.setMake(v.getMake());
			retV.setMileage(v.getMileage());
			retV.setModel(v.getModel());
			retV.setVin(v.getVin());
			retV.setYear(v.getYear());
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return retV;
	}

	@Override
	public Vehicle destroy(int uid, int vid) {
		Vehicle v = em.find(Vehicle.class, vid); 
		if(v.isActive()) {
			v.setActive(false);
		}
		else {
			v.setActive(true);
		}
		return v;
	}
}
