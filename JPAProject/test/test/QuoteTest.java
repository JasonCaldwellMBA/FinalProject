package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

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
		assertEquals("60k Maintenence", quote.getDescription());
		assertNull(quote.getExpireDate());
		assertEquals("2018-01-08 09:30:00.0", quote.getCompleteDate().toString());
		assertEquals(70, quote.getEstimate(), .01);
		assertEquals(false, quote.isActive());
	}
	
	@Test
	public void test_quote_to_request_mapping() {
		assertEquals("Need work", quote.getRequest().getDescription());
	}
	
	@Test
	public void test_quote_to_business_mapping() {
		assertEquals("StumpsAuto", quote.getBusiness().getCompanyName());
	}
	
}
