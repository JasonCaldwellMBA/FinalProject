package entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Quote extends Order {
	
	@ManyToOne
	private Request request;
	
	@OneToMany
	private Business business;
	
	@OneToMany
	private List<Part> parts;
	
	

}
