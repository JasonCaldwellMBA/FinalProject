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

import entities.Contact;
import entities.User;

@Repository
@Transactional
public class UserDAOImpl implements UserDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<User> index(int uid) {
		String query = "SELECT u FROM User u WHERE  u.active = true";
		return em.createQuery(query, User.class)
				.getResultList();
	}
	@Override
	public User show(int id) {
		return em.find(User.class, id); 
	}
	@Override
	public User create(String json) {
		ObjectMapper mapper = new ObjectMapper(); 
		User user = null; 
		try {
			user = mapper.readValue(json, User.class);
			//security check to refuse user if username exists; 
			String query = "SELECT u FROM User u WHERE u.username = :username"; 
			List<User> list = em.createQuery(query, User.class)
				.setParameter("username", user.getUsername())
				.getResultList(); 
			if(list.size() > 0) {
				return null; 
			}else {
				user.setActive(true);
				user.getContact().setActive(true);
				em.persist(user);
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return user;
	}
	@Override
	public User update(int id, String json) {
		ObjectMapper mapper = new ObjectMapper(); 
		User user = null; 
		User retUser = null; 
		try {
			user = mapper.readValue(json, User.class);
			retUser = em.find(User.class, id);
			retUser.setFirstName(user.getFirstName());
			retUser.setLastName(user.getLastName());
			retUser.setPassword(user.getPassword());
			retUser.setUsername(user.getUsername());
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
		return retUser;
	}
	@Override
	public User destroy(int uid) {
		User user = em.find(User.class, uid);
		if(user.isActive()) {
			user.setActive(false);
		}
		else {
			user.setActive(true);
		}
		return user;
	}
	
	@Override
	public Contact showContact(int uid, int cid) {
		Contact contact = em.find(Contact.class, cid);
		if (contact == null || contact.getUser().getId() != uid) {
			return null;
		}
		return contact;
	}

	@Override
	public Contact createContact(int uid, String contactJson) {
		ObjectMapper mapper = new ObjectMapper();
		Contact contact = null;
		try {
			contact = mapper.readValue(contactJson, Contact.class);
			User user = em.find(User.class, uid);
			contact.setUser(user);
			em.persist(contact);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();		}
		return contact;
	}

	@Override
	public Contact updateContact(int uid, int cid, String contactJson) {
		ObjectMapper mapper = new ObjectMapper();
		Contact originalContact = null;
		Contact holderContact = null;
		try {
			holderContact = mapper.readValue(contactJson, Contact.class);
			originalContact = em.find(Contact.class, cid);
			originalContact.setAddress1(holderContact.getAddress1());
			originalContact.setAddress2(holderContact.getAddress2());
			originalContact.setCity(holderContact.getCity());
			originalContact.setEmail(holderContact.getEmail());
			originalContact.setLatitude(holderContact.getLatitude());
			originalContact.setLongitude(holderContact.getLongitude());
			originalContact.setPhone(holderContact.getPhone());
			originalContact.setState(holderContact.getState());
		} catch (Exception e) {
			e.printStackTrace();
			}
		return originalContact;
	}
}
