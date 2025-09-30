from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

headers = {"x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST}


# Search functionality
@app.route("/search", methods=["GET"])
def instagram():
    print(f"Search endpoint called with args: {request.args}")
    
    username = request.args.get("username")
    if not username:
        print("Error: Username parameter is missing")
        return jsonify({"error": "Username parameter is required"}), 400

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    sort = request.args.get("sort", "-score")
    social_types = request.args.get("social_types", "INST")

    print(f"Search parameters: username={username}, page={page}, per_page={per_page}, sort={sort}, social_types={social_types}")

    url = f"https://{RAPIDAPI_HOST}/search"
    querystring = {
        "q": username,
        "page": page,
        "perPage": per_page,
        "sort": sort,
        "socialTypes": social_types,
    }

    print(f"Making request to: {url}")
    print(f"Query parameters: {querystring}")
    print(f"Headers: {headers}")

    try:
        response = requests.get(url, headers=headers, params=querystring)
        print(f"API response status: {response.status_code}")
        print(f"API response headers: {response.headers}")
        
        response.raise_for_status()
        response_json = response.json()
        print(f"API response JSON: {response_json}")
        
        data = response_json.get("data", [])
        print(f"Data array length: {len(data)}")

        # Extract only required fields
        required_data = []
        for item in data:
            filtered_item = {
                "cid": item.get("cid"),
                "name": item.get("name"),
                "image": item.get("image"),
                "screenName": item.get("screenName"),
            }
            required_data.append(filtered_item)
            print(f"Processed item: {filtered_item}")

        print(f"Returning {len(required_data)} results")
        return jsonify(required_data)

    except requests.exceptions.RequestException as e:
        print(f"Request error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


# Influencer Dashboard
@app.route("/community", methods=["GET"])
def community():
    print(f"Community endpoint called with args: {request.args}")
    
    cid = request.args.get("cid")
    if not cid:
        print("Error: cid parameter is missing")
        return jsonify({"error": "cid parameter is required"}), 400

    print(f"Community parameters: cid={cid}")

    url = f"https://{RAPIDAPI_HOST}/community"
    querystring = {"cid": cid}

    print(f"Making request to: {url}")
    print(f"Query parameters: {querystring}")
    print(f"Headers: {headers}")

    try:
        response = requests.get(url, headers=headers, params=querystring)
        print(f"API response status: {response.status_code}")
        print(f"API response headers: {response.headers}")
        
        if response.status_code != 200:
            print(f"API returned non-200 status: {response.status_code}")
            print(f"Response text: {response.text}")
        
        response.raise_for_status()
        response_json = response.json()
        print(f"API response JSON: {response_json}")
        
        data = response_json.get("data", {})
        print(f"Data object keys: {list(data.keys()) if data else 'No data'}")

        filtered_data = {
            "name": data.get("name"),
            "image": data.get("image"),
            "description": data.get("description"),
            "username": data.get("screenName"),
            "followersCount": data.get("usersCount"),
            "avgER": data.get("avgER"),
            "avgLikes": data.get("avgLikes"),
            "avgComments": data.get("avgComments"),
            "avgVideoLikes": data.get("avgVideoLikes"),
            "avgVideoComments": data.get("avgVideoComments"),
            "avgVideoViews": data.get("avgVideoViews"),
        }

        print(f"Filtered data: {filtered_data}")
        return jsonify(filtered_data)

    except requests.exceptions.RequestException as e:
        print(f"Request error in community endpoint: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Error response status: {e.response.status_code}")
            print(f"Error response text: {e.response.text}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"Unexpected error in community endpoint: {str(e)}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


# Post Level Data
@app.route('/posts', methods=['GET'])
def posts():
    print(f"Posts endpoint called with args: {request.args}")
    
    cid = request.args.get('cid')
    if not cid:
        print("Error: cid parameter is missing")
        return jsonify({"error": "cid parameter is required"}), 400

    # Calculate date range: today and one month before
    today = datetime.utcnow().date()
    one_month_ago = today - timedelta(days=30)
    from_date = one_month_ago.strftime("%d.%m.%Y")
    to_date = today.strftime("%d.%m.%Y")

    print(f"Posts parameters: cid={cid}, from={from_date}, to={to_date}")

    url = f"https://{RAPIDAPI_HOST}/posts"
    querystring = {
        "cid": cid,
        "from": from_date,
        "to": to_date,
        "type": "posts",
        "sort": "date"
    }
    
    print(f"Making request to: {url}")
    print(f"Query parameters: {querystring}")
    print(f"Headers: {headers}")
    
    try:
        response = requests.get(url, headers=headers, params=querystring)
        print(f"API response status: {response.status_code}")
        print(f"API response headers: {response.headers}")
        
        if response.status_code != 200:
            print(f"API returned non-200 status: {response.status_code}")
            print(f"Response text: {response.text}")
        
        response.raise_for_status()
        response_json = response.json()
        print(f"API response JSON keys: {list(response_json.keys())}")
        
        data = response_json.get("data", [])
        print(f"Data type: {type(data)}")
        
        if isinstance(data, dict):
            print(f"Data dict keys: {list(data.keys())}")
            posts_data = data.get("posts", [])
        elif isinstance(data, list):
            posts_data = data
        else:
            print(f"Unexpected data type: {type(data)}")
            posts_data = []
            
        print(f"Posts data length: {len(posts_data)}")

        carousel_album_posts = []
        reels_posts = []

        for i, item in enumerate(posts_data):
            print(f"Processing item {i}: {item.get('type', 'unknown type')}")
            
            filtered_item = {
                "postId": item.get("postID"),
                "type": item.get("type"),
                "postUrl": item.get("postUrl"),
                "caption": item.get("text") or item.get("caption"),
                "likes": item.get("likes"),
                "comments": item.get("comments"),
                "interactions": item.get("interactions")
            }

            if item.get("type") == "carousel_album" and len(carousel_album_posts) < 10:
                carousel_album_posts.append(filtered_item)
            elif item.get("type") == "REELS" and len(reels_posts) < 10:
                reels_posts.append(filtered_item)

        result = {
            "POSTS": carousel_album_posts,
            "REELS": reels_posts
        }
        
        print(f"Returning result with {len(carousel_album_posts)} posts and {len(reels_posts)} reels")
        return jsonify(result)

    except requests.exceptions.RequestException as e:
        print(f"Request error in posts endpoint: {str(e)}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Error response status: {e.response.status_code}")
            print(f"Error response text: {e.response.text}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"Unexpected error in posts endpoint: {str(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
