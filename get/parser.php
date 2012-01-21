<?php
require_once __DIR__ . '/trakt.php';

/**
 * TV Show Parser
 */
class Parser {

  private $result;            
  private $trakt;

  /**
   * Constructor.
   *
   * @param string|int  the query string|the id of a tv show.
   */
  public function __construct($query) { 
    $this->trakt = new Trakt('aeddefdbcdd7ca5a2b9855b940389ebe');

    if(is_int($query))
      $this->result = $this->getSeasons($query);              
    else if(is_array($query))
      $this->result  = $this->getEpisodes($query);
    else
      $this->result = $this->getTVShowList($query);              
  }

   /**
    * Returns the result in json format.
    *
    * @return string the links in json format
    */
   public function __toString() {
     return json_encode($this->result);
   }

   /**
    * Extract the list of TV Shows from the search results page.
    *
    * @param $query - the show we're searching for.
    * @return array an array containing the download links.
    */
   private function getTVShowList($query) {  
     return array_map(function($s){
	 return array('id' => $s['tvdb_id'], 'title' => $s['title']);

     }, $this->trakt->searchShows($query));
   }

   /**
    * Return the list of seasons of a tv show.
    * @param int $showID the id fo the show    
    * @return array the list of seasons
    */
   private function getSeasons($showID) {          
     return array_keys($this->trakt->showSeasons($showID));
   }

   /**
    * Return the eposide of a given season for a tv show
    *
    * @param array $query an array (array('showid' => IDOFASHOW, 'season' => SEASONNUMBER)
    * @return array an array containing the list of episodes.
    */
   private function getEpisodes($query) {      
   
     return array_map(function($e) {
	return  array('id'      => $e['episode'],
		      'season'  => $e['season'],
		      'title'   => $e['title'],
		      'airdate' => $e['first_aired']);

     }, $this->trakt->showSeason($query['showid'], $query['season']));   
   }        
}
