package main

import (
	"golang.org/x/net/html"
	"log"
	"strings"
)

// return the first tag in subtree for which reqd returns true (DFS)
func findReqd(doc *html.Node, reqd func(*html.Node) bool) *html.Node {
	if reqd(doc) {
		return doc
	}

	for c := doc.FirstChild; c != nil; c = c.NextSibling {
		g := findReqd(c, reqd)
		if g != nil {
			return g
		}
	}

	return nil
}

// this function will return true for nodes that match table#disptab
func tableTag(t *html.Node) bool {
	if t.Data == "table" {
		a := t.Attr
		for _, attr := range a {
			if attr.Key == "id" && attr.Val == "disptab" {
				return true
			}
		}
	}

	return false
}

// return the number of children of the given node that have type ==
// html.ElementNode
func num_children(t *html.Node) int64 {
	var num int64
	c := t.FirstChild
	for c != nil {
		if c.Type == html.ElementNode {
			num += 1
		}
		c = c.NextSibling
	}
	return num
}

// return a list of children nodes that have type == ElementNodes
func element_node_children(t *html.Node) []*html.Node {
	ret := []*html.Node{}
	for c := t.FirstChild; c != nil; c = c.NextSibling {
		if c.Type == html.ElementNode {
			ret = append(ret, c)
		}
	}
	return ret
}

/*
 * Given the response of a POST timetable_track.js request, return a list of
 * subject entries.
 * Each subject entry consists of the following values in order:
 *     1. Subject code
 *     1. Subject name
 *     1. Subject professors
 *     1. L-T-P allocation
 *     1. Number of credits
 *     1. Slot
 *     1. Venue
 */
func parse_html(input string) [][]string {
    log.Print("Parsing HTML string now")
	doc, err := html.Parse(strings.NewReader(input))
	if err != nil {
		log.Fatal(err)
	}

	rTag := findReqd(doc, tableTag)

	tbody := rTag.LastChild
	rows := element_node_children(tbody)

	ret := [][]string{}

    log.Print("Found total ", len(rows), " rows. Proceeding!")

	for _, c := range rows {
		kids := element_node_children(c)

		// TODO: make this a constant
		if len(kids) == 7 && kids[0].Data != "th" {
			kid_info := []string{}
			for _, tag := range kids {
                tagData := ""

                // possible for <td></td>
                if tag.FirstChild != nil {
                    tagData = tag.FirstChild.Data
                }

				kid_info = append(kid_info, tagData)
			}
			ret = append(ret, kid_info)
		}
	}

    log.Print("Parsing completed! Returning the list of lists!")

	return ret
}
