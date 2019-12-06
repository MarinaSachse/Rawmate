package de.barf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import de.barf.model.Animal;
import de.barf.model.Components;
import de.barf.model.Filtered_by;
import de.barf.repository.IAnimalService;
import de.barf.repository.IComponentService;
import de.barf.repository.IFiltered_byService;

@CrossOrigin(origins = "*")
@RestController
public class Filtered_byController {
	@Autowired
	private IFiltered_byService filterService;
	@Autowired
	private IComponentService cService;
	@Autowired
	private IAnimalService aService;
	//component_id wirklich benötigt? NEIN
	//caterogie auch nicht benötigt, da danach nicht gesucht wird -->an sonsten nach categorie die probeties suchen suchen
	
	//geht
	@GetMapping("/filtered_by")
	public List<Filtered_by> FindAll(){
		return filterService.findAll();
	}
	
	//geht
	@GetMapping("/filtered_by/{id}")
	public Filtered_by findById(@PathVariable ("id") long filtered_by_id) {
		return filterService.findById(filtered_by_id);
	}
	
	//geht
	@GetMapping("/filtered_by/animal/{animal_id}")
	public List<Filtered_by> findByAnimalId(@PathVariable("animal_id") long animal_id) {
		return (List<Filtered_by>) filterService.findByAnimalId(animal_id);
	}
	
	//geht
	@GetMapping("/filtered_by/PropertyAndAnimal/{property}/{animal_id}")
	public List<Filtered_by> findByPropertyAndAnimalId(@PathVariable("property") String property,@PathVariable("animal_id") long animal_id) {
		return (List<Filtered_by>) filterService.findByPropertyAndAnimalId(property, animal_id);
	}
	
	//geht
	//component ID fraglich ob überhaupt dort, an sonsten Deafult festlegen. Kann auch abneigung speichern, ohne das Componente vorhanden
	@PostMapping("/filtered_by/create")
	public Filtered_by createFilter(@RequestBody Filtered_by filtered_by) {
		return filterService.saveFilter(filtered_by);
	}
	
	//geht
	@DeleteMapping("/filtered_by/delete/{filtered_by_id}")
	public void deleteFilter(@PathVariable("filtered_by_id") long filtered_by_id) {
		filterService.deleteFilter(filtered_by_id);		
	}
	
	//geht
	//methode liefert eine liste von Componenten nach Categorie für ein bestimmtes Tier, gelistet nach der Häufigkeit die durch praäferenzen gegeben ist
	@GetMapping("/filteredList/forAnimalAndCategorie/{animal_id}/{categorie}")
	public List<Components> listForAnimal(@PathVariable("animal_id") long animal_id, @PathVariable("categorie") String categorie){
		Animal animal = aService.findById(animal_id);
		long user_id = animal.getUser_id();
		List<Components> allElements = cService.findByCategorieAndUser_id(categorie, user_id);
		List<Components> listOfInterest = cService.findByCategorieAndUser_id(categorie, user_id);
		List<Filtered_by> allergie = filterService.findByPropertyAndAnimalId("Allergie", animal_id);	
		List<Filtered_by> dislike = filterService.findByPropertyAndAnimalId("Abneigung", animal_id);
		List<Filtered_by> preferenc = filterService.findByPropertyAndAnimalId("Vorliebe", animal_id);
		
		for (Components element : allElements){
			for (Filtered_by part : allergie){
				if (part.getName() != null && part.getName().equals(element.getName())){
					long index = element.getComponent_id();
					listOfInterest.remove(cService.findById(index));
				}
				else if (part.getSort() != null && part.getSort().equals(element.getAnimal_sort())){
					long index = element.getComponent_id(); 
					listOfInterest.remove(cService.findById(index));
				}
				else{
					listOfInterest.add(cService.saveComponent(element));
				}
			}
			for (Filtered_by part : dislike){
				if (part.getName() != null && part.getName().equals(element.getName())){
					long index = element.getComponent_id();
					listOfInterest.remove(cService.findById(index));
				}
				else if (part.getSort() != null && part.getSort().equals(element.getAnimal_sort())){
					long index = element.getComponent_id(); 
					listOfInterest.remove(cService.findById(index));
				}
			}
			for (Filtered_by part : preferenc){
				if (part.getName() != null && part.getName().equals(element.getName())){
					listOfInterest.add(cService.saveComponent(element));
				}
				else if (part.getSort() != null && part.getSort().equals(element.getAnimal_sort())){ 
					listOfInterest.add(cService.saveComponent(element));
				}
			}
		}		
		return (List<Components>) listOfInterest;
	}
}
