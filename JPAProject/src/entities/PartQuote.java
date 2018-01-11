package entities;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

//test
@Entity
public class PartQuote {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	@JoinColumn(name="quote_id")
	private Quote quote;
	
	@OneToMany(mappedBy="partsQuote")
	private Collection<Part> parts;

	public Quote getQuote() {
		return quote;
	}

	public void setQuote(Quote quote) {
		this.quote = quote;
	}

	public Collection<Part> getParts() {
		return parts;
	}

	public void setParts(Collection<Part> parts) {
		this.parts = parts;
	}

	public int getId() {
		return id;
	}
	
	
	
}
