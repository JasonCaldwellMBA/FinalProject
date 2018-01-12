package test;

import static org.junit.Assert.assertEquals;

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
//	@Test
//	public void test_show_user() {
//		User user = em.find(User.class, 1); 
//		assertEquals("Allen", user.getFirstName());
//	}
//	@Test 
//	public void test_index_user() {
//		String query = "SELECT u FROM User u"; 
//		List<User>list = em.createQuery(query, User.class)
//				.getResultList();
//		assertEquals(5, list.size()); 
//	}
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
		user.setContact(contact);
		em.persist(user);
		em.flush();
		String query = "SELECT u FROM User u";
		List<User> list = em.createQuery(query, User.class)
				.getResultList(); 
		printUsers(list); 
		assertEquals("Bibby-bob", list.get(0)); 
	}
	public void printUsers(List<User> list) {
		for (User user : list) {
			System.out.println(user);
		}
	}
}
