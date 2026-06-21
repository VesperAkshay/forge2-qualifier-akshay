<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Card;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Card::with('list.board')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'list_id' => 'required|exists:board_lists,id',
            'title' => 'required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'position' => 'sometimes|integer|min:0',
            'due_date' => 'sometimes|nullable|date',
        ]);

        $card = Card::create($validated);

        return response()->json($card, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Card::with('list.board', 'tags', 'members')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'list_id' => 'sometimes|required|exists:board_lists,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'position' => 'sometimes|integer|min:0',
            'due_date' => 'sometimes|nullable|date',
        ]);

        $card = Card::findOrFail($id);
        $card->update($validated);

        return response()->json($card);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $card = Card::findOrFail($id);
        $card->delete();

        return response()->json(null, 204);
    }

    /**
     * Move card to a different list or position
     */
    public function move(Request $request, string $id)
    {
        $validated = $request->validate([
            'list_id' => 'sometimes|required|exists:board_lists,id',
            'position' => 'sometimes|integer|min:0',
        ]);

        $card = Card::findOrFail($id);
        $card->update($validated);

        return response()->json($card);
    }

    /**
     * Attach tags to a card
     */
    public function attachTags(Request $request, string $id)
    {
        $validated = $request->validate([
            'tag_ids' => 'required|array',
            'tag_ids.*' => 'exists:tags,id',
        ]);

        $card = Card::findOrFail($id);
        $card->tags()->sync($validated['tag_ids']);

        return response()->json($card->load('tags'));
    }

    /**
     * Detach a tag from a card
     */
    public function detachTag(Request $request, string $id, string $tagId)
    {
        $card = Card::findOrFail($id);
        $card->tags()->detach($tagId);

        return response()->json($card->load('tags'));
    }

    /**
     * Attach members to a card
     */
    public function attachMembers(Request $request, string $id)
    {
        $validated = $request->validate([
            'member_ids' => 'required|array',
            'member_ids.*' => 'exists:members,id',
        ]);

        $card = Card::findOrFail($id);
        $card->members()->sync($validated['member_ids']);

        return response()->json($card->load('members'));
    }

    /**
     * Detach a member from a card
     */
    public function detachMember(Request $request, string $id, string $memberId)
    {
        $card = Card::findOrFail($id);
        $card->members()->detach($memberId);

        return response()->json($card->load('members'));
    }
}