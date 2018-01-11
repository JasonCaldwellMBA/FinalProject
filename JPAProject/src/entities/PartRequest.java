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
public class PartRequest {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@OneToOne
	@JoinColumn(name="request_id")
	private Request request;
	@OneToMany(mappedBy="partsRequest")
	private Collection<Part> parts;
}




