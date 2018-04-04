package main

var keys = []string{
	"Code",
	"Name",
	"Profs",
	"LTP",
	"Creds",
	"Slot",
	"Room",
}

func change_map_structure(subs map[string][][]string) map[string][]map[string]string {
	ret := make(map[string][]map[string]string)

	for k, v := range subs {
		ret[k] = []map[string]string{}
		for _, sub := range v {
			this_sub_map := make(map[string]string)
			for ind, name := range keys {
				this_sub_map[name] = sub[ind]
			}
			ret[k] = append(ret[k], this_sub_map)
		}
	}

	return ret
}
