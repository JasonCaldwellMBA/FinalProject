package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Quote;

public class QuoteTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private Quote quote;
	
	@Before
	  public void setUp() throws Exception {
		this.emf = Persistence.createEntityManagerFactory("AutoDB");
		this.em = emf.createEntityManager();
		quote = em.find(Quote.class, 1);
	}
	
	@After
	  public void tearDown() throws Exception { 
		this.em.close();
		this.emf.close();
		quote = null;
	}
	
	@Test
	public void test_quote() {
		assertEquals(1, quote.getId());
	}
	
	
	@Test
	public void test_quote_mapping() {
		assertEquals(1, quote.getId());
		assertEquals("desc1", quote.getDescription());
		assertEquals("2017-12-11 11:30:45.0", quote.getPostDate().toString());
		assertEquals("2017-12-11 11:30:45.0", quote.getExpireDate().toString());
		assertEquals("2017-12-11 11:30:45.0", quote.getCompleteDate().toString());
		assertEquals(1, quote.getEstimate(), .01);
	}
	
	@Test
	public void test_quote_to_request_mapping() {
		assertEquals(1, quote.getRequest().getDescription());
	}
	
	@Test
	public void test_quote_to_business_mapping() {
		assertEquals(1, quote.getRequest());
	}
	
}
