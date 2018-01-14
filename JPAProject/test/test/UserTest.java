package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Contact;
import entities.Rating;
import entities.User;

public class UserTest {
	private EntityManagerFactory emf;
	private EntityManager em;	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
	}
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
	}
	
//CRUD functionality
	@Test
	public void test_show_user() {
		User user = em.find(User.class, 1); 
		assertEquals("Allen", user.getFirstName());
	}
	@Test 
	public void test_index_user() {
		String query = "SELECT u FROM User u"; 
		List<User>list = em.createQuery(query, User.class)
				.getResultList();
		assertEquals(5, list.size()); 
	}
	@Test 
	public void test_create_user() {
		User user = new User(); 
		Contact contact = new Contact(); 
		Rating rating = new Rating(); 
		contact.setPhone("816-909-8888");
		contact.setZipcode("87373");
		contact.setEmail("bibby@google.com");
		rating.setRating(4.0);
		user.setUsername("Bibby-bob");
		user.setAdmin(false);
		user.setFirstName("Bibby");
		user.setLastName("bob");
		user.setRating(rating);
		user.setPassword("pwd123");
		user.setContact(contact);
		
		em.getTransaction().begin(); 
		em.persist(user);
		em.flush();
		em.getTransaction().commit();
		
		String query = "SELECT u FROM User u WHERE u.username = :username";
		List<User> list = em.createQuery(query, User.class)
				.setParameter("username", "Bibby-bob")
				.getResultList(); 
		assertEquals("Bibby-bob", list.get(0).getUsername()); 
	}
	@Test
	public void test_destroy_user() {
//		Works
		User user = em.find(User.class, 7); 
		em.getTransaction().begin();
		em.remove(user);
		em.getTransaction().commit();
		
		User u = em.find(User.class, 7); 
		assertEquals(u, null); 
	}
	@Test
	public void test_update_user() {
		User user = em.find(User.class, 1); 
		assertEquals("Allen", user.getFirstName());
		em.getTransaction().begin();
		user.setFirstName("Hodor"); 
		em.getTransaction().commit();
		User u = em.find(User.class, 1); 
		assertEquals("Hodor", u.getFirstName());
	}
	
//Mapping Test 
	@Test
	public void test_user_to_contact() {
		User u = em.find(User.class, 1); 
		assertEquals(u.getContact().getCity(), "Seattle");
	}
	@Test
	public void test_user_to_rating() {
		User u = em.find(User.class, 1); 
		assertEquals(u.getRating().getRating(), 5.0, 1.0); 
	}
	@Test
	public void test_user_to_vehicles() {
		User u = em.find(User.class, 3); 
		assertEquals("Cobalt",u.getVehicle().get(0).getModel());
		assertEquals("Bronco", u.getVehicle().get(1).getModel());
	}
	
	@Test
	public void test_user_to_request() {
		User user = em.find(User.class, 1); 
		assertNotNull(user.getRequests().get(0).getId());
		assertNotNull(user.getRequests().get(0).getDescription());
		
	}
}