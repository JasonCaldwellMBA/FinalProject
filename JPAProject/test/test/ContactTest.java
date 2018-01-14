package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Contact;

public class ContactTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private Contact contact;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		contact = em.find(Contact.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		contact = null;
	}
	
	@Test
	public void test_contact() {
		assertEquals(1, contact.getId());
	}
	
	@Test
	public void test_contact_mapping() {
		assertNotNull(contact.getId());
		assertNotNull(contact.getCity());
		assertNotNull(contact.getState());
		assertNotNull(contact.getAddress1());
		assertNull(contact.getAddress2());
		assertNotNull(contact.getZipcode());
		assertNotNull(contact.getPhone());
		assertNotNull(contact.getEmail());
		assertNull(contact.getLatitude());
		assertNull(contact.getLongitude());
		assertNotNull(contact.isActive());
	}
	
}