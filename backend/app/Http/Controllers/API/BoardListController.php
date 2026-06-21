<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BoardList;

class BoardListController extends Controller
{
    public function index(Request $request)
    {
        $query = BoardList::with(['board', 'cards.tags', 'cards.members']);
        
        if ($request->has('board_id')) {
            $query->where('board_id', $request->board_id);
        }
        
        return $query->orderBy('position')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'board_id' => 'required|exists:boards,id',
            'title' => 'required|string|max:255',
            'position' => 'sometimes|integer|min:0',
        ]);

        $boardList = BoardList::create($validated);

        return response()->json($boardList, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return BoardList::with('board.lists.cards.tags.members')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'board_id' => 'sometimes|required|exists:boards,id',
            'title' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|integer|min:0',
        ]);

        $boardList = BoardList::findOrFail($id);
        $boardList->update($validated);

        return response()->json($boardList);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $boardList = BoardList::findOrFail($id);
        $boardList->delete();

        return response()->json(null, 204);
    }
}