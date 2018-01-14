package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Rating {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id; 
	private double rating;
	@OneToOne(mappedBy="rating")
	private User user; 
	
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public int getId() {
		return id;
	}
}
