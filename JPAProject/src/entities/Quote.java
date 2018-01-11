package entities;
//test
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

public class Quote {
	private int id; 
	private Request request;
	private Business business; 	
	private PartQuote partQuote;
	private String description; 
	private Timestamp postDate; 
	private Timestamp expireDate; 
	private Timestamp completeDate; 
	private double estimate; 
}
