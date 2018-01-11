package entities;
//test
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name="first_name")
	private String firstName;
	@Column(name="last_name")
	private String lastName;
	@ManyToOne
	@JoinColumn(name="contact_id")
	private Contact contact;
	@OneToOne
	@JoinColumn(name="rating_id")
	private double rating;
	@JoinColumn(name="privilege")
	private boolean privilege; 
	private String userName;
	List<Business> associatedBusinesses;
}
