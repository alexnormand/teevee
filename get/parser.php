<?php
namespace FilesTube;

require_once 'goutte.phar';
use Goutte\Client;

/**
 * Filestube Parser
 *
 */
class Parser {

  private $downloadLinks;
  private $baseUrl              = 'http://epguides.com/HowIMetYourMother';  
  private $directDownloadLinkId = '#copy_paste_links';
 

  /**
   * Constructor.
   *
   * @param string the query string.
   */
   public function __construct($query) {
     $client = new Client();
     $crawler = $client->request('GET', $this->baseUrl . $query);
     $this->downloadLinks = $this->getDownloadLinks($crawler);          
   }


   /**
    * Returns the download links in json format.
    *
    * @return string the links in json format
    */
   public function __toString() {
     return json_encode($this->downloadLinks);
   }

   /**
    * Extract the download Links form the search results page.
    *
    * @param \Crawler a \Crawler object from which to extract download links.
    * @return array an array containing the download links.
    */
   private function getDownloadLinks($crawler) {                     
     $links = array();

     foreach ($crawler->filter($this->linkToDownloadLink)->links() as $link) {
       try {	 
	 $client = new Client();
	 $downloadLink = $client->request($link->getMethod(), $link->getUri())
  	                        ->filter($this->directDownloadLinkId)
                     	        ->first()
                         	->text();     	 	 	 
	 
	 preg_replace('/\r\n$/', '', $downloadLink);

	 //ony select single download links
	 if(preg_match_all('#http://#', $downloadLink, $matches) === 1) 
	   $links[] = $downloadLink;

	 
       } catch (Exception $e) {}      
     }

     return $links;
   }
}


