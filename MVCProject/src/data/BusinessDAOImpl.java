package data;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Business;
import entities.Contact;
import entities.User;

@Repository
@Transactional
public class BusinessDAOImpl implements BusinessDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Business> index() {
		System.out.println("in DAO");
		String query = "Select b from Business b";
		return em.createQuery(query, Business.class)
				 .getResultList();
	}

	@Override
	public Business show(int bid) {
		return em.find(Business.class, bid);
	}

	@Override
	public Business create( String businessJson) {
		ObjectMapper mapper = new ObjectMapper();
		Business business = null;
		try {
			System.out.println(businessJson);
			business = mapper.readValue(businessJson, Business.class);
			em.persist(business);
			em.flush();
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return business;
	}

	@Override
	public Business update(int bid, String businessJson) {
		ObjectMapper mapper = new ObjectMapper();
		Business holderBusiness = null;
		Business orgBusiness = null;
		Contact c = null;
		try {
			orgBusiness = em.find(Business.class, bid);
			holderBusiness = mapper.readValue(businessJson, Business.class);
			
			c = em.find(Contact.class, holderBusiness.getContact().getId());
			c.setAddress1(holderBusiness.getContact().getAddress1());
			c.setAddress2(holderBusiness.getContact().getAddress2());
			c.setCity(holderBusiness.getContact().getCity());
			c.setEmail(holderBusiness.getContact().getEmail());
			c.setLatitude(holderBusiness.getContact().getLatitude());
			c.setLongitude(holderBusiness.getContact().getLongitude());
			c.setPhone(holderBusiness.getContact().getPhone());
			c.setState(holderBusiness.getContact().getState());	
			
			orgBusiness.setCompanyName(holderBusiness.getCompanyName());
			orgBusiness.setLoginName(holderBusiness.getLoginName());
			orgBusiness.setLoginPassword(holderBusiness.getLoginPassword());
			orgBusiness.setContact(c);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orgBusiness;
	}

	@Override
	public Business destroy(int bid) {
		Business business = em.find(Business.class, bid);
		if (business.isActive()) {
			business.setActive(false);
		} else {
			business.setActive(true);
		}
		return business;
	}
	
	@Override
	public Contact showContact(int bid, int cid) {
		Contact contact = em.find(Contact.class, cid);
		if (contact == null || contact.getBusiness().getId() != bid) {
			return null;
		}
		return contact;
	}
	
	@Override
	public Contact createContact(int bid, String contactJson) {
		ObjectMapper mapper = new ObjectMapper();
		Contact contact = null;
		try {
			contact = mapper.readValue(contactJson, Contact.class);
			Business business = em.find(Business.class, bid);
			contact.setBusiness(business);
			em.persist(contact);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();		}
		return contact;
	}

	@Override
	public Contact updateContact(int bid, int cid, String contactJson) {
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
