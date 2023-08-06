#include <stdint.h>
#include <string>
#include <vector>
#include <map>

extern "C" {
  extern void return_output(const char* str, uint32_t size);

  char* alloc(uint32_t size) {
    return new char[size];
  }

  void analyse(char* ptr) {
    std::string str = ptr;
    std::string buffer;
    std::vector<std::string> words;

    for (const char c : str) {
      if (c == ' ' || c == ',' || c == '\n') {
        if (buffer.length() > 0) {
          words.push_back(buffer);
          buffer.clear();
        }
      } else {
        buffer += c;
      }
    }

    std::map<std::string, uint32_t> histogram;

    for (const std::string& word : words) {
      histogram[word]++;
    }

    std::string out_json;
    out_json += '{';

    for (const auto& [word, count] : histogram) {
      out_json += "\"" + word + "\": " + std::to_string(count) + ",";
    }

    out_json.pop_back();
    out_json += '}';

    return_output(out_json.c_str(), out_json.length());
  }
}
