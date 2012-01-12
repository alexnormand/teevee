<?php
namespace Epguides;

require_once 'goutte.phar';
use Goutte\Client;

/**
 * Epguides Parser
 *
 */
class Parser {

  private $result;
  private $baseUrl              = 'http://www.google.com/search?hl=en&q=allintitle%3A&q=site%3Aepguides.com&q=';
  private $epguidesBaseUrl      = 'http://epguides.com/';
  private $directDownloadLinkId = '#copy_paste_links';
 

  /**
   * Constructor.
   *
   * @param string  the query string.
   * @param boolean Are we extracting info of a specific TV Show, if true the 
                    Parser will extract all of the info about a TV Show, if 
                    false the Parser will search for all TV Show matching the 
                    query.
   */
  public function __construct($query, $isTVShow=false) {

    $client = new Client();

    if($isTVShow) {    
      $crawler      = $client->request('GET',
				       $this->epguidesBaseUrl . $query . '/');
      $this->result = $this->getTVShowInfo($crawler);          
      
    } else {
      $crawler      = $client->request('GET',  $this->baseUrl . $query);
      $this->result = $this->getTVShowList($crawler);          
    }
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
    * @param \Crawler a \Crawler object from which to extract download links.
    * @return array an array containing the download links.
    */
   private function getTVShowList($crawler) {                          
     return $crawler->filter('cite')->each(function($node, $i) {
	 if(preg_match('/epguides.com/', $node->textContent))
	   return substr(
		      preg_replace('#epguides.com/#', ' ', $node->textContent),
		      0,
		      -1);
       });
   }


   /**
    * Extract a TV show's info (seasons, episodes,...) from the search results 
    * page.
    *
    * @param \Crawler a \Crawler object from which to a TV show's info.
    * @return array an array containing the TV Show's info
    */
   private function getTVShowInfo($crawler) {     
     return  $crawler->filter('pre a[title]')->each(function($node, $i) {
	 return array($node->getAttribute('title') => $node->textContent);
       });

     

     
   }
}
