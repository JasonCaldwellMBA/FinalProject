package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Quote;
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
	@Test
	public void test_show_user() {
		User user = em.find(User.class, 1); 
		assertEquals("Allen", user.getFirstName());
	}
}
