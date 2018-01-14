package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Rating;

public class RatingTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private Rating rating;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		rating = em.find(Rating.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		rating = null;
	}
	
	@Test
	public void test_rating() {
		assertEquals(1, rating.getId());
	}
	
	
	@Test
	public void test_rating_mapping() {
		assertNotNull(rating.getId());
		assertNotNull(rating.getRating());
	}
	
}
